import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (
) => {
  const shouldRedirect = true;

  if (shouldRedirect) {
    return {
      redirect: {
        destination: '/splash',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Retorne as props necessárias para a página
  };
};

const MyPage = () => {
  return (
    <div>
      {/* Conteúdo da página */}
    </div>
  );
};

export default MyPage;