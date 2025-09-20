import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Chatbot from './Chatbot';

const CommentSection = ({ post, token, onCommentAdded }) => {
    const [comment, setComment] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post(`http://localhost:5000/api/community/posts/${post._id}/comments`, { content: comment }, config);
            setComment('');
            onCommentAdded();
        } catch (err) {
            console.error("Failed to add comment", err);
            alert("Failed to add comment.");
        }
    };

    return (
        <div className="comment-section">
            <div className="comment-list">
                {post.comments && post.comments.map(c => (
                    <div key={c._id} className="comment-card">
                        <p className="comment-content">{c.content}</p>
                        <p className="comment-meta">by {c.authorName} on {new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            {token && (
                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button type="submit">Post</button>
                </form>
            )}
        </div>
    );
};

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/community/posts');
            setPosts(res.data);
        } catch (err) {
            setError('Could not load community posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return alert('Please fill in both title and content.');
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post('http://localhost:5000/api/community/posts', { title, content }, config);
            setTitle('');
            setContent('');
            fetchPosts();
        } catch (err) {
            setError('Could not create post. Please try again.');
        }
    };

    if (loading) return <div><Header /><p style={{textAlign: 'center', marginTop: '30px'}}>Loading Community Hub...</p></div>;
    if (error) return <div><Header /><p style={{ color: 'red', textAlign: 'center', marginTop: '30px' }}>{error}</p></div>;

    return (
        <div>
            <Header />
            <main className="community-main">
                {token && (
                    <section className="community-section post-form">
                        <h2>Create a New Post</h2>
                        <form onSubmit={handlePostSubmit}>
                            <input
                                type="text"
                                placeholder="Post Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="What's on your mind? Ask a question or share something helpful."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                            <button type="submit">Submit Post</button>
                        </form>
                    </section>
                )}
                <section className="community-section">
                    <h2>Community Feed</h2>
                    <div className="post-list">
                        {posts.length === 0 ? <p>No posts yet. Be the first to create one!</p> : posts.map(post => (
                            <div key={post._id} className="post-card">
                                <h3>{post.title}</h3>
                                <p className="post-meta">by {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}</p>
                                <p>{post.content}</p>
                                <CommentSection post={post} token={token} onCommentAdded={fetchPosts} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            {/* Floating Chatbot Button */}
            <button
                style={{
                    position: 'fixed',
                    bottom: '32px',
                    right: '32px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f8cff 60%, #00e6c3 100%)',
                    color: 'white',
                    fontSize: '2rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                aria-label="Open Chatbot"
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            >🤖</button>
            <Chatbot />
        </div>
    );
};

export default Community;