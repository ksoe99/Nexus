import os
import praw
import random
import time
from dotenv import load_dotenv
from praw.exceptions import RedditAPIException

load_dotenv("C:\\NexusAutoOps\\config.env")

USER_AGENT = "NexusKarmaBot/1.0 by newscasteruk"
SUBREDDITS = ["test", "CasualConversation", "AskReddit"]
COMMENTS = [
    "That’s an insightful angle—thanks for sharing!",
    "I hadn’t seen it that way before.",
    "Really adds to the discussion, appreciate it!",
    "Helpful point, thanks!",
]

def karma_comment_routine():
    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_SECRET"),
        username=os.getenv("REDDIT_USERNAME"),
        password=os.getenv("REDDIT_PASSWORD"),
        user_agent=USER_AGENT,
        check_for_async=False
    )

    print("[AUTH TEST] Logged in as:", reddit.user.me())
    print("[KARMA] Running Reddit engagement routine...")

    for sub in SUBREDDITS:
        print(f"[INFO] Fetching hot posts from r/{sub}...")
        try:
            for post in reddit.subreddit(sub).hot(limit=3):
                comment = random.choice(COMMENTS)
                try:
                    post.reply(comment)
                    print(f"[SUCCESS] Commented in r/{sub}: {comment}")
                    sleep_time = random.randint(600, 900)  # Wait 10–15 minutes
                    print(f"[INFO] Sleeping for {sleep_time//60} minutes.")
                    time.sleep(sleep_time)
                except RedditAPIException as e:
                    if any("RATELIMIT" in str(err) for err in e.items):
                        print("[ERROR] RATELIMIT hit, backing off for a while.")
                        time.sleep(random.randint(600, 900))
                    else:
                        print(f"[ERROR] Reddit error: {e}")
                    break  # Skip to next subreddit
        except Exception as e:
            print(f"[ERROR] Failed to fetch r/{sub}: {e}")

if __name__ == "__main__":
    karma_comment_routine()
