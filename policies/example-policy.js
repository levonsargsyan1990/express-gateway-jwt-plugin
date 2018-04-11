module.exports = {
  name: 'example-jwt-policy',
  policy: (actionParams) => {
    return (req, res, next) => {
      // eslint-disable-next-line no-console
      console.log('Yoohoo!!! Executing example-jwt-policy with params', actionParams);
    };
  }
};
