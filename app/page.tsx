import DeletePost from "@/components/DeletePost";
import Uploader from "@/components/Uploader";
import { supabaseServer } from "@/lib/supabase/server";
import Image from "next/image";
import React from "react";

async function page() {
  const supabase = supabaseServer();

  const { data } = await supabase
    .from("posts")
    .select("*,profiles(display_name)")
    .order("created_at", { ascending: false });

  const imageUrlHost =
    "https://gsufemwlaicffkbpawge.supabase.co/storage/v1/object/public/images/";
  const posts = data?.map((post) => {
    return {
      image: `${post.post_by}/${post.id}/${post.name}`,
      ...post,
    };
  });
  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {posts?.map((post) => {
          return (
            <div key={post.id} className="rounded-md w-full space-y-5 relative">
              <div className="w-full h-96 relative border rounded-md">
                <Image
                  src={imageUrlHost + post.image}
                  alt={post.description || ""}
                  fill
                  className="rounded-md object-cover object-center"
                />
              </div>
              <h1>@{post.profiles?.display_name}</h1>
              <DeletePost post_by={post.post_by} image={post.image} />
            </div>
          );
        })}
      </div>
      <Uploader />
    </div>
  );
}

export default page;
