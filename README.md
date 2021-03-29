# When_does_it_Dry_If_I_Landary_Now
# 지금 빨면 언제 말라?

## Project Overview

> **지금 빨래를 하면 언제쯤 마르는지 예측해주는 서비스**

> 중요한 약속 등으로 빨래를 해야 하는데, 스케줄에 맞춰 빨래가 마를 지 고민이 되어 빨래를 해야할 지, 말아야 할 지 고민했던 적 있으시죠?

> 기상청에서 습도 및 온도를 받아와 관련 정보로 예측해 줍니다!

![https://user-images.githubusercontent.com/72953899/112801384-cbec4b00-90ab-11eb-835a-b9fa2224fec7.png](https://user-images.githubusercontent.com/72953899/112801384-cbec4b00-90ab-11eb-835a-b9fa2224fec7.png)

![https://user-images.githubusercontent.com/72953899/112801433-d9a1d080-90ab-11eb-9497-b7404f18e357.png](https://user-images.githubusercontent.com/72953899/112801433-d9a1d080-90ab-11eb-9497-b7404f18e357.png)

![https://user-images.githubusercontent.com/72953899/112801442-dd355780-90ab-11eb-9677-b63922d0a688.png](https://user-images.githubusercontent.com/72953899/112801442-dd355780-90ab-11eb-9677-b63922d0a688.png)

---

## Features

- 지금 빨래를 돌리면 언제 마르는 지 예측
- 날짜 선택 후 그 때 까지 빨래가 마를 지 예측

---

## Upcoming Features

- localhost에서만 작동하지 않고 domain에서 접속 가능하도록
- Progressive Web App을 이용하여 모바일 환경에서 사용 가능

---

## Usage

1. Chrome에서 작동합니다.
2. HTML5에서 제공하는 사용자의 현재 위치를 받고 사용해보세요!

---

## Getting Started

1. clone

    ```markdown
    git clone git@github.com:Park-KwonSoo/When_does_it_Dry_If_I_Landary_Now.git
    ```

2. npm install

    ```markdown
    cd laundary-server
    npm install
    ```

    ```markdown
    cd laundary-client
    npm install
    ```

3. set Env

    ```markdown
    cd laundary-server
    touch .env
    ---TYPE THIS IN .env FILE---
    SERVER_PORT = ###
    SERVICE_KEY = (기상청 API Service Key)
    CLIENT_ID = (네이버 Map API Client ID)
    CLIENT_SECRET = (네이버 Map API Client Secret Key)
    ```

4. server

    ```markdown
    Directory : laundary-server
    npm start
    ```

5. client

    ```markdown
    Directory : laundary-client
    npm start
    ```

---

## License
