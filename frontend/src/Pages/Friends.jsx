import React from 'react'
import { UsersIcon, VideoIcon, MessageCircleIcon, SearchIcon, UserPlusIcon } from 'lucide-react'
import { Link } from 'react-router'
import useGetFriends from '../hooks/useGetFriends'
import FriendCard from '../components/FriendCard'
import PageLoader from '../components/PageLoader'

const Friends = () => {
    const { friends, loadingFriends, error } = useGetFriends()

    if (loadingFriends) {
        return <PageLoader />
    }

    return (
        <div className="px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-8 lg:px-8 lg:pt-8 lg:pb-8">
            <div className="container mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <UsersIcon className="size-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Friends</h1>
                            <p className="text-sm text-base-content/70 mt-1">
                                {friends?.length || 0} friend{friends?.length !== 1 ? 's' : ''} connected
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link to="/notifications" className="btn btn-outline btn-sm">
                            <UserPlusIcon className="size-4 mr-2" />
                            Friend Requests
                        </Link>
                        <Link to="/" className="btn btn-primary btn-sm">
                            <SearchIcon className="size-4 mr-2" />
                            Find Friends
                        </Link>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="alert alert-error">
                        <div>
                            <h3 className="font-bold">Error loading friends</h3>
                            <div className="text-xs">{error.message || 'Something went wrong'}</div>
                        </div>
                    </div>
                )}

                {/* Friends Grid */}
                {!error && (
                    <>
                        {!friends || friends.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="p-4 bg-base-200 rounded-full">
                                        <UsersIcon className="size-12 text-base-content/40" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold">No friends yet</h3>
                                        <p className="text-base-content/70 max-w-sm">
                                            Start connecting with language learners from around the world!
                                        </p>
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <Link to="/" className="btn btn-primary">
                                            <SearchIcon className="size-4 mr-2" />
                                            Find Friends
                                        </Link>
                                        <Link to="/notifications" className="btn btn-outline">
                                            <UserPlusIcon className="size-4 mr-2" />
                                            Check Requests
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="stat bg-base-200 rounded-lg">
                                        <div className="stat-figure text-primary">
                                            <UsersIcon className="size-8" />
                                        </div>
                                        <div className="stat-title">Total Friends</div>
                                        <div className="stat-value text-primary">{friends.length}</div>
                                    </div>

                                    <div className="stat bg-base-200 rounded-lg">
                                        <div className="stat-figure text-secondary">
                                            <MessageCircleIcon className="size-8" />
                                        </div>
                                        <div className="stat-title">Available for Chat</div>
                                        <div className="stat-value text-secondary">{friends.length}</div>
                                    </div>

                                    <div className="stat bg-base-200 rounded-lg">
                                        <div className="stat-figure text-accent">
                                            <VideoIcon className="size-8" />
                                        </div>
                                        <div className="stat-title">Video Call Ready</div>
                                        <div className="stat-value text-accent">{friends.length}</div>
                                    </div>
                                </div>

                                {/* Friends Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {friends.map((friend) => (
                                        <FriendCard key={friend._id} friend={friend} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Friends