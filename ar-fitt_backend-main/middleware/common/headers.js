export class Headers {
  addCommonHeaders(_, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Accept", "application/json");
    next();
  }
}
