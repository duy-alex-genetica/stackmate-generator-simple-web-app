-- Ensure Lua can find json.lua
package.path = "/fluent-bit/scripts/?.lua;" .. package.path
json = require("json")  -- ✅ Load JSON parser

local function read_json_file(path)
    local file = io.open(path, "r")
    if not file then
        return nil
    end

    local content = file:read("*a")
    file:close()

    -- Use json.lua to decode JSON
    local success, data = pcall(json.decode, content)
    if not success then
        return nil
    end

    return data
end

function rename_log_key(tag, timestamp, record)
    if record["log"] then
        record["message"] = record["log"]  -- Copy 'log' to 'message'
        record["log"] = nil                -- Remove the old 'log' field
    end
    return 1, timestamp, record
end

function add_metadata(tag, timestamp, record)
    -- Ensure 'log_file' exists
    if not record["log_file"] then
        return 1, timestamp, record
    end

    -- Extract container ID from log file path
    local container_id = record["log_file"]:match("/var/lib/docker/containers/([a-f0-9]+)/")
    if not container_id then
        return 1, timestamp, record
    end

    record["container_id"] = container_id

    -- Read metadata from config.v2.json
    local metadata_path = "/var/lib/docker/containers/" .. container_id .. "/config.v2.json"
    local metadata = read_json_file(metadata_path)

    if metadata and metadata.Config then
        record["docker_image"] = metadata.Config.Image or "unknown"

        if metadata.Name then
            record["service_name"] = metadata.Name:gsub("/", "")
        else
            record["service_name"] = "unknown"
        end
    end

    return 1, timestamp, record
end