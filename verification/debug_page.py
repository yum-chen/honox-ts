from playwright.sync_api import sync_playwright

def debug_page(page):
    page.goto("http://localhost:5173")
    print(f"Title: {page.title()}")
    content = page.content()
    print(f"Contains 'Tabs Component Examples': {'Tabs Component Examples' in content}")
    page.screenshot(path="verification/debug_page.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            debug_page(page)
        except Exception as e:
            print(f"Debug failed: {e}")
        finally:
            browser.close()
