// // CommunityHighlights.js
// import React from 'react';

// const CommunityPost = ({ post }) => (
//   <div className="card bg-base-100 shadow-xl">
//     <div className="card-body">
//       <h2 className="card-title">{post.title}</h2>
//       <p>{post.content}</p>
//       <div className="card-actions justify-end">
//         <button className="btn">Read More</button>
//       </div>
//     </div>
//   </div>
// );

// const CommunityHighlights = ({ communityPosts }) => (
//   <div className="p-8">
//     <h2 className="text-2xl font-bold mb-4">Community Highlights</h2>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {communityPosts.map(post => <CommunityPost key={post.id} post={post} />)}
//     </div>
//   </div>
// );

// export default CommunityHighlights;