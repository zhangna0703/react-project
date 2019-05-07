import Server from './server'
import {getUrlConcat} from '../utils/commons'
class API extends Server{
  /**
   *  用途：获取验证码
   *  @url http://cangdu.org:8001/v1/captchas
   *  返回status为1表示成功
   *  @method get
   *  @return {promise}
   */
  async getCaptchaCode() {
    try{
      let result = await this.axios('post', '/v1/captchas', {})
      if (result.status === 1 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取验证码失败',
          response: result,
        }
        throw err
      }
    } catch(err){
      throw err
    }
  }
    /**
   *  用途：账号密码登录
   *  @url http://cangdu.org:8001/v2/login
   *  @method post
   *  @return {promise}
   */
  async accountLogin (data) {
    try {
      let result = await this.axios('post', '/v2/login', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '登录失败',
          response: result,
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

   /**
   * 获取用户消息
   * @param {*} get的拼接参数
   */
  async getUser (data) {
    try {
      let result = await this.axios('get', '/v1/user' + getUrlConcat(data) )
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取用户信息失败',
          response: result,
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }

   /**
   *  用途：上传图片
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async uploadImg(data){
    try{
      let result = await this.axios('post', '//elm.cangdu.org/v1/addimg/shop', data); 
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: '上传图片失败',
          response: result,
          url: '//elm.cangdu.org/v1/addimg/shop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

   /**
   *  用途：获取用户地址列表
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method get
   */
  async getAddress(id){
    try{
      let result = await this.axios('get', '/v1/users/' + id + '/addresses'); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取地址失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   *
   *  用途: 搜索符合条件的地址
   * @param {*} data
   * @memberof API
   */
  async searchPois(data){
    try{
      let result = await this.axios('get', '/v1/pois/' + getUrlConcat(data)); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '搜索地点失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   * 用途: 根据经纬度获取地点信息
   * @param {*} data
   * @memberof API
   */
  async getPoisSite(data){
    try{
      let result = await this.axios('get', '/v2/pois/' + data); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取地点失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *用途: 获取食物种类
   * @param {*} data
   * @memberof API
   */
  async getFoodTypes(data){
    try{
      let result = await this.axios('get', '/v2/index_entry/' + getUrlConcat(data)); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取食物种类失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *用途: 猜测城市
   * @param {*} keyword
   * @memberof API
   */
  async cityGuess( keyword){
    try{
      let result = await this.axios('get', '/v1/cities?type=guess'); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '城市失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *用途: 获取商店列表
   * @param {*} data
   * @memberof API
   */
  async getShopList( data){
    try{
      let result = await this.axios('get', '/shopping/restaurants/' + getUrlConcat(data)); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取商店列表失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *用途: 获取商店详情
   * @param {*} id
   * @param {*} data
   * @memberof API
   */
  async shopDetails( id, data){
    try{
      let result = await this.axios('get', '/shopping/restaurant/'+ id + getUrlConcat(data)); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取商店详情失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

  /**
   *用途: 获取食物清单
   * @param {*} data
   * @memberof API
   */
  async getfoodMenu(data){
    try{
      let result = await this.axios('get', '/shopping/v2/menu/' + getUrlConcat(data)); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取商店详情失败',
          response: result,
          url: '//elm.cangdu.org/v1/carts/addresses',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }

}

export default new API()