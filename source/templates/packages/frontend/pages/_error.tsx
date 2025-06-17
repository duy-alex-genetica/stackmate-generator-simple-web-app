import * as Sentry from '@sentry/nextjs';
import type { NextPage, NextPageContext } from 'next';
import Error from 'next/error';

type CustomErrorProps = {
  statusCode: number;
};

const CustomErrorComponent: NextPage<CustomErrorProps> = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);
  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;
