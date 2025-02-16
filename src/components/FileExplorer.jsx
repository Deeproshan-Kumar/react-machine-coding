import React, { useState } from "react";
import record from "../data/data.json";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Explorer = ({ list, addNewFolder, addNewFile, deleteItem }) => {
  return (
    <div className="tree">
      {list.map((node) => {
        return (
          <div key={node?.id} className="node">
            {node?.children ? (
              <details>
                <summary>
                  <span>
                    {node?.isFolder ? "📁" : "📄"}
                    {node?.name}
                  </span>
                  <div>
                    <button
                      className="button"
                      title="New File"
                      onClick={() => addNewFile(node?.id)}
                      style={{"--clr": "#ffffff"}}
                    >
                      <FaFileCirclePlus />
                    </button>
                    <button
                      className="button"
                      title="New Folder"
                      onClick={() => addNewFolder(node?.id)}
                      style={{"--clr": "#ffd900"}}
                    >
                      <MdCreateNewFolder />
                    </button>
                    <button
                      className="button"
                      title="Delete"
                      onClick={() => deleteItem(node?.id)}
                      style={{"--clr": "#ff0000"}}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </summary>
                {node?.children && (
                  <Explorer
                    list={node?.children}
                    addNewFile={addNewFile}
                    addNewFolder={addNewFolder}
                    deleteItem={deleteItem}
                  />
                )}
              </details>
            ) : (
              <>
                <span>
                  {node?.isFolder ? "📁" : "📄"}
                  {node?.name}
                </span>
                {node?.children && (
                  <Explorer
                    list={node?.children}
                    addNewFile={addNewFile}
                    addNewFolder={addNewFolder}
                    deleteItem={deleteItem}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const FileExplorer = () => {
  const [data, setData] = useState(record);
  const addNewFolder = (parentId) => {
    const folderName = prompt("Enter file/folder name");
    const updateFolderTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: folderName,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateFolderTree(node.children),
          };
        }
        return node;
      });
    };
    setData((prev) => updateFolderTree(prev));
  };

  const addNewFile = (parentId) => {
    const fileName = prompt("Enter file name");
    const updateFileTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: fileName,
                isFolder: false,
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateFileTree(node.children),
          };
        }
        return node;
      });
    };
    setData((prev) => updateFileTree(prev));
  };

  const deleteItem = (parentId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== parentId)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children),
            };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <section className="file-explorer">
      <div className="wrapper">
        <Explorer
          list={data}
          addNewFile={addNewFile}
          addNewFolder={addNewFolder}
          deleteItem={deleteItem}
        />
      </div>
    </section>
  );
};

export default FileExplorer;
