from playwright.sync_api import sync_playwright
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3004")

        # Scroll to HoverCard section
        page.get_by_role("heading", name="HoverCard Component Examples").scroll_into_view_if_needed()

        # Hover over "Basic HoverCard"
        page.get_by_text("Basic HoverCard").hover()
        time.sleep(2) # wait for delay and animation

        page.screenshot(path="verification/hover_card_basic_v3.png")

        # Hover over "Hover with Arrow"
        page.get_by_role("button", name="Hover with Arrow").hover()
        time.sleep(2)

        page.screenshot(path="verification/hover_card_arrow_v3.png")

        browser.close()

if __name__ == "__main__":
    verify()
