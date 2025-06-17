import Image from 'next/image';

export function <%= classify(name) %>SectionHeader() {
  return (
    <div className="section-header">
      <Image
        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        alt="<%= classify(name) %> image"
        width={600}
        height={400}
      />
      <h1><%= classify(name) %></h1>
      <div>Welcome to the <%= dasherize(name) %> page!</div>
    </div>
  );
}
