from selenium import webdriver 
from selenium.webdriver.chrome.webdriver import WebDriver 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from time import sleep
import os

def create_product (driver: WebDriver):
    imageFile = os.path.abspath('lapiz.jpg')
    sleep(1)
    link = driver.find_element(By.LINK_TEXT, 'Add Product')
    link.click()

    code = driver.find_element(By.ID, 'product-code')
    code.send_keys('COD-123')

    name = driver.find_element(By.ID, 'product-name')
    name.send_keys('Producto 1')

    price = driver.find_element(By.ID, 'product-price')
    price.send_keys(10)

    type = Select(driver.find_element(By.ID, 'product-type'))
    type.select_by_value('Electronics')

    cost = driver.find_element(By.ID, 'product-cost')
    cost.send_keys(9)

    stock = driver.find_element(By.ID, 'product-stock')
    stock.send_keys(12)

    img = driver.find_element(By.ID, 'product-image')
    img.send_keys(imageFile)

    sleep(1)
    submit = driver.find_element(By.CLASS_NAME, 'btn-primary')
    submit.click()

    sleep(1)

def edit_product (driver: WebDriver): 
    sleep(1)
    edit_button = driver.find_element(By.CLASS_NAME, 'edit-btn')
    edit_button.click()

    sleep(1)
    alert_code = driver.switch_to.alert
    alert_code.send_keys('CO1')
    alert_code.accept()

    sleep(1)
    alert_name = driver.switch_to.alert
    alert_name.send_keys('Producto 22')
    alert_name.accept()

    sleep(1)
    alert_type = driver.switch_to.alert
    alert_type.send_keys('Electronic')
    alert_type.accept()

    sleep(1)
    alert_price = driver.switch_to.alert
    alert_price.send_keys('20')
    alert_price.accept()

    sleep(1)
    alert_cost = driver.switch_to.alert
    alert_cost.send_keys('15')
    alert_cost.accept()

    sleep(1)
    alert_stock = driver.switch_to.alert
    alert_stock.send_keys('122')
    alert_stock.accept()


    sleep(1)


def delet_product (driver: WebDriver):
    deletButton = driver.find_element(By.CLASS_NAME, 'delete-btn')
    deletButton.click()
    sleep(1)

    alert = driver.switch_to.alert
    alert.accept()
    sleep(1)

if __name__ == '__main__':
    driver  = webdriver.Chrome()
    driver.get("http://127.0.0.1:5500/index.html")

    try:
        create_product(driver)
        edit_product(driver)
        delet_product(driver)

    finally:
        driver.quit()
