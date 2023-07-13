import { FC } from 'react';

type ErrorPageProps = {
  errorMessage: string;
};

export const ErrorPage: FC<ErrorPageProps> = ({ errorMessage }) => {
  return <div>{errorMessage}</div>;
};
