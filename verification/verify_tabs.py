from playwright.sync_api import sync_playwright, expect

def test_tabs(page):
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")

    # Check if Tabs section is present
    tabs_heading = page.get_by_role("heading", name="Tabs Component Examples")
    expect(tabs_heading).to_be_visible()

    # The React tab in Tabs component should have role="tab"
    react_tab = page.get_by_role("tab", name="React")
    expect(react_tab).to_be_visible()
    expect(react_tab).to_have_attribute("aria-selected", "true")

    # Click Solid tab
    solid_tab = page.get_by_role("tab", name="Solid")
    solid_tab.click()

    # Wait for state change
    page.wait_for_timeout(500)

    # Check if Solid tab is now selected
    expect(solid_tab).to_have_attribute("aria-selected", "true")

    # Check if Solid content is visible
    expect(page.get_by_text("Solid is a declarative")).to_be_visible()

    page.screenshot(path="verification/tabs_final.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_tabs(page)
            print("Tabs verification successful")
        except Exception as e:
            print(f"Tabs verification failed: {e}")
        finally:
            browser.close()
