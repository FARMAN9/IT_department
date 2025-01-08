import React, { useState } from 'react';
import { Heart, Share2, Download } from 'lucide-react';
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";

// Generate varied height placeholder images to create masonry effect
const photos = [
  { id: 1, src: 'https://i.pinimg.com/736x/2c/37/1b/2c371bf81a801a5fdda5a1df40291561.jpg', liked: false },  // Tall
  { id: 2, src: 'https://scontent.fsxr1-1.fna.fbcdn.net/v/t39.30808-6/301056032_526702499259178_8126940499136309854_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=8WdVgdUcvg0Q7kNvgGyluAT&_nc_zt=23&_nc_ht=scontent.fsxr1-1.fna&_nc_gid=AANj6T_AX5tNOYevIMct2up&oh=00_AYBuKIMbx475XNcYwGoMO7JW_dACIIg_goK-fY8tV-LaEQ&oe=677F52F2', liked: false },  // Short
  { id: 3, src: 'https://images.unsplash.com/photo-1728931935943-0d7b67f99f23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D', liked: false },  // Medium
  { id: 4, src: 'https://scontent.fsxr1-1.fna.fbcdn.net/v/t39.30808-6/301056032_526702499259178_8126940499136309854_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=8WdVgdUcvg0Q7kNvgGyluAT&_nc_zt=23&_nc_ht=scontent.fsxr1-1.fna&_nc_gid=AANj6T_AX5tNOYevIMct2up&oh=00_AYBuKIMbx475XNcYwGoMO7JW_dACIIg_goK-fY8tV-LaEQ&oe=677F52F2', liked: false },  // Very tall
  { id: 5, src: 'https://i.pinimg.com/736x/ae/e7/64/aee7640199fabae38f60b6e93274bed5.jpg', liked: false },  // Short-medium
  { id: 6, src: 'https://upload.wikimedia.org/wikipedia/en/2/24/National_Institute_of_Technology%2C_Srinagar_Logo.png', liked: false },  // Medium-tall
  { id: 7, src: 'https://plus.unsplash.com/premium_photo-1734000749015-9aa5dde5935c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D', liked: false },  // Medium
  { id: 8, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTX2kY3Ck3WGrPQ1Htr4oaQAfWARraeeqNog&s', liked: false },  // Tall
  { id: 9, src: 'https://i.pinimg.com/736x/9d/65/ef/9d65ef0b4e897fcdccf469d14f5005b5.jpg', liked: false },  // Square
  { id: 10, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMDaLUL_oweGYfkxLM5tipR7307tC8cf7cBg&s', liked: false }, // Medium
  { id: 11, src: 'https://images.unsplash.com/photo-1728931935943-0d7b67f99f23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D', liked: false }, // Short-medium
  { id: 12, src: 'https://i.pinimg.com/736x/a9/7a/47/a97a476ae448db0143d359251019de6b.jpg', liked: false }  // Medium
];

function Gallery() {
  const [items, setItems] = useState(photos);

  const handleLike = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, liked: !item.liked } : item
    ));
  };

  return (

<>
    <>
    <div className="min-h-auto flex lg:mr-10">
  <main className="flex-1 lg:ml-10 p-2 lg:p-4">
    <div className="max-w-9xl mx-auto p-0 pt-4 space-y-8">
      
      {/* Coordinator Section */}
      <div className="relative">
        <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
        Infrastructure: At a glance
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
        
        <div className="flex flex-wrap -mx-4">
    {/* Render photos using masonry layout */}
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {items.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative group"
            >
              <div className="relative">
                <img
                  src={photo.src}
                  alt={`Photo ${photo.id}`}
                  className="w-full object-cover rounded-xl"
                  loading="lazy"
                />
                
                {/* Save button */}
                <button className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Save
                </button>
                
                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-xl">
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={() => handleLike(photo.id)}
                      className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200"
                    >
                      <Heart 
                        className={`h-5 w-5 ${photo.liked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                      />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                      <Share2 className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                      <Download className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    

    {/* Render photos using masonry layout */}
    <ImageSlide />
    <div className='flex'>
    < DepartmentOfItInfo />

<Mission_and_Vision />
    </div>
   
    
  </div>
      
        </div>
      </div>
    </div>
  </main>
</div>


</>

</>
  );
}

export default Gallery;