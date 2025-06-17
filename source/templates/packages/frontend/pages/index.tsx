import LayoutAuthed from "@/components/layouts/LayoutAuthed";
import Container from "@/components/ui/container";
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

function Home(): JSX.Element {
  return (
    <LayoutAuthed pageClasses="page-home">
      <Container>
        Home page
      </Container>
    </LayoutAuthed>
  );
}

export default Home;
