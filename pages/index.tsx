import { createClient } from "@supabase/supabase-js"
import Card from "../components/Card"

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin
    .from("anime_list")
    .select("*")
    .order("id");
  return {
    props: {
      images: data,
    },
  };
}



const Home = ({images} : {images: Image[]}) => {
  return (
    <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='grid gird-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {images.map((image) => (
          <Card key={image.id} image={image}/>
        ))}
      </div>
    </div>
  )
}

export default Home
