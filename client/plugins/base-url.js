
export default ({ app }, inject) => {
  inject('baseUrl', process.env.BASE_URL)
}
