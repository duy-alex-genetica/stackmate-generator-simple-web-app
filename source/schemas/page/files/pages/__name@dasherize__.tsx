import LayoutAuthed from "@/components/layouts/LayoutAuthed";
import Container from "@/components/ui/container";
import { <%= classify(name) %>SectionHeader } from '@/components/pages/<%= dasherize(name) %>/section-header';
import { getServerTranslations } from "@/helpers/localization";
import { GetServerSidePropsContext } from "next/types";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translations = await getServerTranslations(context.locale);

  return {
    props: {
      ...translations,
    },
  };
}

export default function <%= classify(name) %>Page(): JSX.Element {
  return (
    <LayoutAuthed pageClasses="page-<%= dasherize(name) %>">
      <Container>
        <<%= classify(name) %>SectionHeader />
      </Container>
    </LayoutAuthed>
  );
}
