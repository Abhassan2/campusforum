import usePostContext from '@/app/context/postContext';
import InfoPanel from './infoPanel';
import CommentUi from '@/ui/Comment';

export default function SuggestCard() {
  const { openCommentBox } = usePostContext();

  return (
    <div className={`hidden md:block ${openCommentBox && "md:w-100"}`}>
        {openCommentBox ? (
          <CommentUi />
        ) : (
          <div className="w-100 min-w-70 h-screen hidden lg:block overflow-x-hidden">
            <InfoPanel
              type="suggestions"
              items={[
                {
                  title: "New on CampusHub",
                  subtitle: "See the latest student posts",
                },
                {
                  title: "Top profiles",
                  subtitle: "Popular creators to follow",
                },
                {
                  title: "Trending topics",
                  subtitle: "What students are talking about",
                },
              ]}
            />
          </div>
        )}
    </div>
  )
}
