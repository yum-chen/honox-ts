from playwright.sync_api import sync_playwright, expect
import time

def test_field_validation_final():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the landing page
        page.goto("http://localhost:5173/")

        # Wait for the page to load and find the Email field
        email_field = page.get_by_label("Email")

        # 1. Test MinLength
        email_field.fill("abc")
        time.sleep(1)
        expect(page.get_by_text("Must be at least 5 characters")).to_be_visible()
        page.screenshot(path="/home/jules/verification/final_minlength.png", full_page=True)
        print("MinLength error verified")

        # 2. Test Custom Validator (Invalid Email)
        email_field.fill("abcdef")
        time.sleep(1)
        expect(page.get_by_text("Invalid email format")).to_be_visible()
        page.screenshot(path="/home/jules/verification/final_custom_error.png", full_page=True)
        print("Custom validator error verified")

        # 3. Test Success
        email_field.fill("test@example.com")
        time.sleep(1)
        expect(page.get_by_text("Must be at least 5 characters")).not_to_be_visible()
        expect(page.get_by_text("Invalid email format")).not_to_be_visible()
        page.screenshot(path="/home/jules/verification/final_success.png", full_page=True)
        print("Validation success verified")

        browser.close()

if __name__ == "__main__":
    test_field_validation_final()
