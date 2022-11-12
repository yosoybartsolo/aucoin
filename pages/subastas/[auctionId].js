//make a page for each auction
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/auctions");
  const auctions = await res.json();

  const paths = auctions.map((auction) => ({
    params: { id: auction.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/auctions/${params.id}`);
  const auction = await res.json();

  return {
    props: {
      auction,
    },
  };
}

export default function Auction({ auction }) {
  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.description}</p>
    </div>
  );
}
