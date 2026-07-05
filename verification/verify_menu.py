from playwright.sync_api import sync_playwright, expect

def test_menu(page):
    page.goto("http://localhost:5173")

    # Check if "Open Menu" button is present
    menu_trigger = page.get_by_role("button", name="Open Menu").first
    expect(menu_trigger).to_be_visible()

    # Click to open menu
    menu_trigger.click()

    # Check if menu item "New Tab" is visible
    expect(page.get_by_text("New Tab")).to_be_visible()

    page.screenshot(path="verification/menu_open.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_menu(page)
            print("Menu verification successful")
        except Exception as e:
            print(f"Menu verification failed: {e}")
            page.screenshot(path="verification/menu_error.png")
        finally:
            browser.close()
