from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json
import time
import re
from urllib.parse import quote

def scrape_jd_products(keyword, count=10):
    """爬取京东商品数据"""
    # 设置Chrome选项
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    
    driver = None
    products = []
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
        wait = WebDriverWait(driver, 15)
        
        # 访问京东搜索页面
        url = f"https://search.jd.com/Search?keyword={quote(keyword)}&enc=utf-8"
        driver.get(url)
        
        # 等待商品列表加载
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.gl-item')))
        
        # 提取商品数据
        items = driver.find_elements(By.CSS_SELECTOR, '.gl-item')
        
        for item in items[:count]:
            try:
                # 商品名称
                try:
                    name_elem = item.find_element(By.CSS_SELECTOR, '.p-name em')
                    name = name_elem.text.strip()
                except:
                    name = ''
                
                # 商品价格
                try:
                    price_elem = item.find_element(By.CSS_SELECTOR, '.p-price strong i')
                    price = price_elem.text
                except:
                    price = '0'
                
                # 商品图片
                try:
                    img_elem = item.find_element(By.CSS_SELECTOR, '.p-img img')
                    img = img_elem.get_attribute('src') or img_elem.get_attribute('data-src') or ''
                except:
                    img = ''
                
                # 商品链接
                try:
                    link_elem = item.find_element(By.CSS_SELECTOR, '.p-img a')
                    link = link_elem.get_attribute('href')
                except:
                    link = ''
                
                # 销量
                try:
                    sales_elem = item.find_element(By.CSS_SELECTOR, '.p-commit strong')
                    sales = sales_elem.text
                except:
                    sales = ''
                
                if name and img:
                    products.append({
                        'name': name,
                        'price': price,
                        'image': img,
                        'link': link,
                        'sales': sales
                    })
            except Exception as e:
                continue
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if driver:
            driver.quit()
    
    return products

def main():
    keywords = ['iphone15手机', 'macbook笔记本', 'airpods耳机', 'sk2护肤品']
    
    all_products = []
    
    for keyword in keywords:
        print(f"正在爬取 {keyword}...")
        products = scrape_jd_products(keyword, 10)
        all_products.extend(products)
        print(f"  获取到 {len(products)} 个商品")
        time.sleep(3)  # 避免请求过快
    
    # 保存到JSON
    with open('src/data/real-products.json', 'w', encoding='utf-8') as f:
        json.dump(all_products, f, ensure_ascii=False, indent=2)
    
    print(f"\n共爬取 {len(all_products)} 个商品，保存到 src/data/real-products.json")

if __name__ == '__main__':
    main()
