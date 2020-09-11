import React, {useEffect, useState} from "react"
import Taro from "@tarojs/taro"
import {Image, Text, View} from "@tarojs/components"
import {styled} from "linaria/react"
import {AtNoticebar} from "taro-ui"

import cart from "../../assets/images/cart.png"
import QRcode from "../../assets/images/QRcode.png"
import history from "../../assets/images/list.png"
import help from "../../assets/images/help.png"
import share from "../../assets/images/share.png"
// import picture from "../../assets/images/picture.png"
import contact from "../../assets/images/contact.png"
import feedback from "../../assets/images/feedback.png"

import EyButton from "../../components/EyButton"
import EyLogin from "../../components/Login"
import {checkLogin} from "../../utils/login"

const Container = styled(View)`
  height: 100vh;
  background: #EDEDED;
`

const BigTitle = styled(View)`
  height: 300px;
  background: #4EA570;
`

const ContentWrapper = styled(View)`
  padding: 32px;
`

const BigButton = styled(View)`
  box-sizing: border-box;
  display: flex;
  height: 160px;
  padding: 28px 40px 28px 52px;
  margin-top: 32px;
  border-radius: 12px;
  background: #61B38A;
  > View:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > Text {
      color: #fff;
      &:first-child {font-size: 40px;}
      &:last-child {font-size: 28px;}
    }
  }
  > View:last-child {
    display: flex;
    align-items: center;
    > Image {
      width: 80px;
      height: 80px;
    }
  }

`

const ButtonWrapper = styled(View)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Index = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    Taro.showShareMenu({withShareTicket: true})
    init()
  }, [])

  useEffect(() => {
    init()
  }, [isLogin])

  const init = async () => {
    const isLoginInfo = await checkLogin()
    setIsLogin(isLoginInfo)
  }

  const onGetUserInfoEventDetail = (data) => {
    console.log(data)
  }

  const linkShop = () => {
    Taro.navigateTo({url: "/pages/shopLink/shopLink"})
  }

  const linkQRcode = () => {
    Taro.navigateTo({url: "/pages/QRcodePage/QRcodePage"})
  }

  const linkHistory = () => {
    Taro.navigateTo({url: "/pages/history/history"})
  }

  const linkFaq = () => {
    Taro.navigateTo({url: "/pages/faq/faq"})
  }

  return (
    <Container>
      {isLogin === true ? null : <EyLogin fn={onGetUserInfoEventDetail}/>}
      <BigTitle></BigTitle>
      <ContentWrapper>
        <AtNoticebar icon='volume-plus' marquee>我是测试内容</AtNoticebar>
        <BigButton onClick={linkShop}>
          <View>
            <Text>商品链接</Text>
            <Text>支持京东/拼多多佣金链接</Text>
          </View>
          <View>
            <Image src={cart}/>
          </View>
        </BigButton>
        <BigButton onClick={linkQRcode}>
          <View>
            <Text>二维码链接</Text>
            <Text>支持加好友/群、邀请海报...</Text>
          </View>
          <View>
            <Image src={QRcode}/>
          </View>
        </BigButton>
        <ButtonWrapper>
          <EyButton onClick={linkHistory} src={history} value='历史记录'/>
          <EyButton onClick={linkFaq} src={help} value='常见问题'/>
          <EyButton type='share' src={share} value='邀请好友'/>
          {/*<EyButton src={picture} value='生成海报'/>*/}
          <EyButton type='contact' src={contact} value='在线客服'/>
          <EyButton type='feedback' src={feedback} value='意见反馈'/>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default Index
