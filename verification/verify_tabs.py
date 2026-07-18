from playwright.sync_api import sync_playwright, expect
import time

def test_tabs_visual():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 1000})

        url = "http://[::1]:5173/"
        print(f"Navigating to {url}...")
        page.goto(url)

        page.wait_for_load_state("networkidle")
        print("Page loaded successfully.")

        tabs_card = page.locator("text=Tabs Navigation").first
        expect(tabs_card).to_be_visible()

        # Scroll the Tabs card into view
        tabs_card.scroll_into_view_if_needed()
        print("Scrolled Tabs card into view.")

        # Click "Features"
        features_trigger = page.locator('[data-part="trigger"][data-value="features"]')
        features_trigger.click()
        print("Clicked 'Features' tab.")

        # Click "Hono"
        hono_trigger = page.locator('[data-part="trigger"][data-value="hono"]')
        hono_trigger.click()
        print("Clicked 'Hono' tab.")

        # Click "Security"
        security_trigger = page.locator('[data-part="trigger"][data-value="security"]')
        security_trigger.click()
        print("Clicked 'Security' tab.")

        time.sleep(1)

        # Take full page screenshot centered around the card
        screenshot_path = "verification/tabs-screenshot.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    test_tabs_visual()
