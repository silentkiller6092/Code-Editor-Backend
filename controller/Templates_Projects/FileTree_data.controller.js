import { DatabaseConnection } from "../../DB/DBConnection.js";

const getFileTree = async (req, res) => {
  const { template_id } = req.params;

  try {
    const query = `
      SELECT id, template_id, parent_id, name, type, content
      FROM files
      WHERE template_id = ?;
    `;
    const fileTreeItems = await new Promise((resolve, reject) => {
      DatabaseConnection.all(query, [template_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    const groupedByParentId = fileTreeItems.reduce((acc, item) => {
      if (!acc[item.parent_id]) {
        acc[item.parent_id] = [];
      }
      acc[item.parent_id].push(item);
      return acc;
    }, {});

    const buildTree = (parentId = null) => {
      const items = groupedByParentId[parentId] || [];
      return items.map((item) => {
        const node = {
          id: item.id,
          name: item.name,
          type: item.type,
          content: item.content,
        };

        const children = buildTree(item.id);
        if (children.length > 0) {
          node.children = children;
        }

        return node;
      });
    };

    const fileTreeData = buildTree();
    return res.status(200).json({
      status: "Success",
      response: fileTreeData,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      response: null,
      error: err.message,
    });
  }
};

export { getFileTree };
