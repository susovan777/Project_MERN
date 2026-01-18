import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVideoById,
  incrementViews,
  updateVotes,
} from '../../services/videoService.js';
import styles from './VideoDetail.module.css';
import Container from '../../components/Container/Container.jsx';
import Button from '../../components/Button/Button.jsx';
import { ArrowLeft, Eye, ThumbsDown, ThumbsUp } from 'lucide-react';
import { getVideoAge } from '../../utils/dateDistance.js';

/**
 * VideoDetail Page
 * Shows full video player with details and voting
 */
const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Track user's vote state
  const [userVote, setUserVote] = useState(null); // null, 'upVote', or 'downVote'

  // Ref to track if view was already counted
  const viewCounted = useRef(false);

  // Fetch video details and increment view count
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);

      try {
        // Fetch video
        const videoData = await getVideoById(id);
        setVideo(videoData);

        // Increment view count
        if (!viewCounted.current) {
          await incrementViews(id);
          viewCounted.current = true;

          // Update local state with incremented view count
          setVideo((prev) => ({
            ...prev,
            viewCount: (prev?.viewCount || 0) + 1,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch video:', error);
        toast.error(error.message || 'Failed to fetch video');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVideo();

    // Load user vote from localStorage on mount
    const savedVote = localStorage.getItem(`vote_${id}`);
    if (savedVote) setUserVote(savedVote);

    // Cleanup function
    return () => {
      viewCounted.current = false;
    };
  }, [id]);

  // Handle vote button click
  const handleVote = async (voteType) => {
    try {
      let updatedVideo;

      // Toggle logic
      if (userVote === voteType) {
        updatedVideo = await updateVotes(id, voteType, 'decrease');
        setUserVote(null);
        localStorage.removeItem(`vote_${id}`);
        toast.success('Vote removed');
      } else if (userVote && userVote !== voteType) {
        // User is switching from one vote to another
        // First decrease the old vote
        await updateVotes(id, userVote, 'decrease');
        // Then increase the new vote
        updatedVideo = await updateVotes(id, voteType, 'increase');
        setUserVote(voteType);
        localStorage.setItem(`vote_${id}`, voteType);
        toast.success(`${voteType === 'upVote' ? '👍' : '👎'} Vote recorded!`);
      } else {
        // User is voting for the first time
        updatedVideo = await updateVotes(id, voteType, 'increase');
        setUserVote(voteType);
        localStorage.setItem(`vote_${id}`, voteType);
        toast.success(`${voteType === 'upVote' ? '👍' : '👎'} Vote recorded!`);
      }

      setVideo(updatedVideo);
    } catch (error) {
      console.error('Failed to update vote:', error);
      toast.error(error.message || 'Failed to update vote');
    }
  };

  // Format view count (1200000 → 1.2M)
  const formatViews = (count) => {
    if (count > 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count > 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading video...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Error State
  if (!video) {
    return (
      <div className={styles.container}>
        <Container>
          <div className={styles.error}>
            <h2>Video not found</h2>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft size={18} />
              Back to Home
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Container>
        {/* Back button */}
        <div className={styles.backButton}>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </div>

        {/* Video Player */}
        <div className={styles.player}>
          <iframe
            src={video.videoLink}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{video.title}</h1>

          <div className={styles.statsRow}>
            {/* Left side: Stats */}
            <div className={styles.stats}>
              <span className={styles.stat}>
                <Eye size={16} />
                {formatViews(video.viewCount)} views
              </span>
              <span className={styles.dot}>•</span>
              <span className={styles.stat}>
                {getVideoAge(video.releaseDate)}
              </span>
            </div>

            {/* Right side: Vote Buttons */}
            <div className={styles.voteButtons}>
              <button
                className={`${styles.voteButton} ${styles.upvote} ${
                  userVote === 'upVote' ? styles.active : ''
                }`}
                onClick={() => handleVote('upVote')}
                aria-label="Like"
              >
                <ThumbsUp size={16} />
                <span>{video.votes?.upVotes || 0}</span>
              </button>

              <button
                className={`${styles.voteButton} ${styles.downvote} ${
                  userVote === 'downVote' ? styles.active : ''
                }`}
                onClick={() => handleVote('downVote')}
                aria-label="Dislike"
              >
                <ThumbsDown size={16} />
                <span>{video.votes?.downVotes || 0}</span>
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className={styles.badges}>
            <span className={styles.genreBadge}>{video.genre}</span>
            <span className={styles.ratingBadge}>{video.contentRating}</span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default VideoDetail;
