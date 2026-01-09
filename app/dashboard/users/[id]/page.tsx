interface UserDetailsProps {
  params: Promise<{ id: string }>;
}

const UserDetailsPage = async ({ params }: UserDetailsProps) => {
  const { id } = await params;
  
  return (
    <section>
      <h1>User Details</h1>
      <p>Showing details for user {id}</p>
    </section>
  );
};

export default UserDetailsPage;