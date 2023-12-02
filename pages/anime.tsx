import React from "react";
import { db } from "../utils/db/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface anime {
  name: string;
  imgUrl: string;
  rate: string;
  href: string;
}

const anime = () => {
  const [anime, setAnime] = React.useState<anime[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getAnime = async () => {
      const animeCol = collection(db, "watch_list");
      const animeSnapshot = await getDocs(animeCol);
      const animeList = animeSnapshot.docs.map((doc) => doc.data()) as any;

      setAnime(animeList);
      setLoading(false);
    };

    getAnime();
  }, []);

  return (
    <>
      <div className="max-w-7xl    mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-5 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-y-10   gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
              {anime.map((product, index) => (
                <div key={index} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.rate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default anime;
