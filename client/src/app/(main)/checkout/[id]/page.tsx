import CheckoutForm from "@/components/molecules/CheckoutForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Acquisition Checkout | Artora Protocol",
  description: "Preview your selected artwork and choose Cash on Delivery.",
};

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

interface Artwork {
  _id: string;
  title: string;
  imageURL: string;
  artist: { firstName: string; lastName: string };
  price: number;
  openingBid?: number;
  salePath: "direct" | "auction";
  createdAt: string;
}

async function getArtwork(id: string): Promise<Artwork | null> {
  const cookieStore = await cookies();

  try {
    // API to get artwork details
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/artworks/${id}`,
      {
        headers: { Cookie: cookieStore.toString() },
        // Disable caching to get fresh data
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();

    return data.artwork;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return null;
  }
}

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { id } = await params;
  // Fetch artworks details
  const artwork = await getArtwork(id);

  if (!artwork) {
    notFound();
  }

  // Normalize artist name
  const artistName = `${artwork.artist.firstName} ${artwork.artist.lastName}`;

  // Normalize price based sale type
  const displayPrice =
    artwork.salePath === "auction" ? artwork.openingBid || 0 : artwork.price;

  return (
    <main className="min-h-screen pt-20 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <CheckoutForm
          artwork={artwork}
          artistName={artistName}
          displayPrice={displayPrice}
        />
      </div>
    </main>
  );
};

export default CheckoutPage;
