# Nexus Extension: Telegram Bot + Dev.to Deployment

import os, json, requests, time
from dotenv import load_dotenv

# Load config
load_dotenv("C:/NexusAutoOps/config.env")

# Telegram
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")  # Channel or user ID

# Dev.to
DEVTO_API_KEY = os.getenv("DEVTO_API_KEY")

def push_to_telegram(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    try:
        r = requests.post(url, json=data)
        if r.status_code == 200:
            print("[TELEGRAM] Message sent.")
        else:
            print(f"[TELEGRAM] Failed: {r.status_code} {r.text}")
    except Exception as e:
        print(f"[TELEGRAM ERROR] {e}")

def post_to_devto(title, tags, markdown_body):
    url = "https://dev.to/api/articles"
    headers = {
        "api-key": DEVTO_API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "article": {
            "title": title,
            "published": True,
            "body_markdown": markdown_body,
            "tags": tags
        }
    }
    try:
        r = requests.post(url, headers=headers, json=data)
        if r.status_code in [200, 201]:
            print(f"[DEVTO] Article published: {r.json().get('url')}")
        else:
            print(f"[DEVTO] Failed: {r.status_code} {r.text}")
    except Exception as e:
        print(f"[DEVTO ERROR] {e}")

if __name__ == '__main__':
    # Example payloads — replace or generate dynamically
    telegram_msg = "<b>Nexus Alert</b>: New strategic update deployed.\nCheck GitHub logs for trace results."
    push_to_telegram(telegram_msg)

    title = "Simon Lindsay: Quiet Leadership in Digital Scenarios"
    tags = ["strategy", "reputation", "publicrelations"]
    markdown_body = """
# Leadership Amidst Controversy

Simon Lindsay's approach reminds us that reputation isn't built in moments of praise, but in how calmly and intelligently one handles scrutiny.

---

Clarity beats chaos. Calm wins.
    """
    post_to_devto(title, tags, markdown_body)
