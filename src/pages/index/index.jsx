import React, { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { Button, Image, Text, View } from "@tarojs/components"
import { styled } from "linaria/react"

import cart from "../../assets/images/cart.png"
import QRcode from "../../assets/images/QRcode.png"
import history from "../../assets/images/list.png"
import help from "../../assets/images/help.png"
import share from "../../assets/images/share.png"
import picture from "../../assets/images/picture.png"
import contact from "../../assets/images/contact.png"
import feedback from "../../assets/images/feedback.png"

import EyButton from "../../components/EyButton"

import { updateUserData, login } from "../../utils/auth"
import { WEAPPID } from "../../config"

const Container = styled(View)`
  position: relative;
  height: 100vh;
  background: #EDEDED;
  > .settings {
    position: absolute;
    z-index: 99999;
    top: 350px;
    left: 0;
    width: 100%;
    height: 180px;
    border-radius: 0;
    background: rgba(0,0,0,0);
    &::before, &::after {
      display:none;
    }
  }
`

const BigTitle = styled(View)`
  height: 300px;
  background: #ff6700;
  > Image {
    width: 100%;
    height: 100%;
  }
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
  background: #ff6700;
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

export default () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    void Taro.showShareMenu({withShareTicket: true})
  }, [])

  const linkShop = () => {
    void Taro.navigateTo({url: "/pages/shopLink/shopLink"})
  }

  const linkContactUs = () => {
    void Taro.previewImage({
      current: 'https://gitmen-bsm.oss-cn-beijing.aliyuncs.com/media/rc-upload-1601284094358-3', // 当前显示图片的http链接
      urls: ['https://gitmen-bsm.oss-cn-beijing.aliyuncs.com/media/rc-upload-1601284094358-3'], // 需要预览的图片http链接列表
    })
  }

  const linkQRcode = () => {
    void Taro.navigateTo({url: "/pages/shareQRcode/index"})
  }

  const linkHistory = () => {
    void Taro.navigateTo({url: "/pages/history/history"})
  }

  const linkFaq = () => {
    void Taro.navigateTo({url: "/pages/faq/faq"})
  }

  const settings = async (data) => {
    const {detail: {encryptedData, iv}} = data
    let userinfo = Taro.getStorageSync("userinfo")
    if (userinfo.avatar) {
      linkShop()
      return
    }
    if (data.detail.errMsg === "getUserInfo:fail auth deny") return
    updateUserData({
      "appid": WEAPPID,
      "enc_data": encryptedData,
      "iv": iv,
    }).then(() => {
      login()
    })
    if (userinfo.avatar) { setIsLogin(false) }
  }

  return (
    <Container>
      {isLogin ? <Button className='settings' onGetUserInfo={settings} openType='getUserInfo'></Button> : null}
      <BigTitle>
        <Image src='https://gitmen-bsm.oss-cn-beijing.aliyuncs.com/media/rc-upload-1601284094358-5'/>
      </BigTitle>
      <ContentWrapper>
        <BigButton onClick={linkShop}>
          <View>
            <Text>商品链接</Text>
            <Text>支持京东佣金链接</Text>
          </View>
          <View>
            <Image src={cart}/>
          </View>
        </BigButton>
        <BigButton onClick={linkContactUs}>
          <View>
            <Text>联系我们</Text>
            <Text>获取更多视频号带货内容</Text>
          </View>
          <View>
            <Image src={QRcode}/>
          </View>
        </BigButton>
        <ButtonWrapper>
          <EyButton onClick={linkHistory} src={history} value='历史记录'/>
          <EyButton onClick={linkFaq} src={help} value='常见问题'/>
          <EyButton type='share' src={share} value='邀请好友'/>
          <EyButton src={picture} onClick={linkQRcode} value='生成海报'/>
          <EyButton type='contact' src={contact} value='在线客服'/>
          <EyButton type='feedback' src={feedback} value='意见反馈'/>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  )
}
