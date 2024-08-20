const SocialIcons = ({
  postTitle,
  postUrl,
}: {
  postTitle: string;
  postUrl: string;
}) => {
  const encodedTitle = encodeURIComponent(postTitle);
  const encodedUrl = encodeURIComponent(postUrl);
  return (
    <div className="flex gap-2">
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`}
        target="_blank"
      >
        <img src="/assets/social/whatsapp.svg" className="w-8" alt="whatsapp" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
      >
        <img src="/assets/social/twitter.svg" className="w-8" alt="twitter" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
      >
        <img src="/assets/social/facebook.svg" className="w-8" alt="facebook" />
      </a>
    </div>
  );
};

export default SocialIcons;
