const fs = require("fs");
const path = require("path");
const crypto = reqire("crypto");

class DB {
  constructor(name) {
    this.name = name;
    this.path = path.join(__dirname, `db/${this.name}.json`);
  }
  get = () => {
    const content = fs.readFileSync(this.path, "utf-8");
    const parsed = JSON.parse(content);
    return parsed;
  };
  save = (data) => {
    const string = JSON.stringify(data);
    fs.writeFileSync(this.path, string, "utf-8");
  };
  getById = (id) => {
    const parsedContent = this.get();
    const item = parsedContent.find((i) => i.id === id);
    return item;
  };

  updateById = (id, body) => {
    const parsedContent = this.get();
    const itemIndex = parsed.findIndex((i) => i.id === id);
    parsedContent[itemIndex] = { id: id, ...body };

    this.save(parsedContent);
  };
  addNew = (item) => {
    const parsed = this.get();
    parsed.push({
      ...item,
      id: crypto.randomUUID(),
    });
    this.save(parsed);
  };
  removeById = (id) => {
    const parsedList = this.get();
    const itemIndex = parsed.findIndex((i) => i.id === id);
    parsedList.splice(itemIndex, 1);
    this.save(parsedList);
  };
}
module.exports = DB;
