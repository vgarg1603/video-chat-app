import React from 'react'
import { MessageCircleIcon, VideoIcon } from 'lucide-react'
import { Link } from 'react-router'

// Helper function to get language flags
const getLanguageFlag = (language) => {
  const flags = {
    english: '🇺🇸',
    spanish: '🇪🇸',
    french: '🇫🇷',
    german: '🇩🇪',
    italian: '🇮🇹',
    portuguese: '🇵🇹',
    russian: '🇷🇺',
    chinese: '🇨🇳',
    japanese: '🇯🇵',
    korean: '🇰🇷',
    arabic: '🇸🇦',
    hindi: '🇮🇳',
    dutch: '🇳🇱',
    swedish: '🇸🇪',
    norwegian: '🇳🇴',
    danish: '🇩🇰',
    finnish: '🇫🇮',
    polish: '🇵🇱',
    czech: '🇨🇿',
    turkish: '🇹🇷'
  };
  return flags[language?.toLowerCase()] || '🌍';
};

// Helper function to capitalize first letter
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const FriendCard = ({friend}) => {
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{friend.fullName}</h3>
          </div>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-secondary">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {capitalize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {capitalize(friend.learningLanguage)}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link 
            to={`/chat/${friend._id}`} 
            className="btn btn-primary btn-sm flex-1"
          >
            <MessageCircleIcon className="size-4 mr-1" />
            Chat
          </Link>
          <Link 
            to={`/call/${friend._id}`} 
            className="btn btn-outline btn-sm flex-1"
          >
            <VideoIcon className="size-4 mr-1" />
            Call
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FriendCard