interface FileSystemTree {
  [name: string]: DirectoryNode | FileNode;
}

interface DirectoryNode {
  directory: FileSystemTree;
}

interface FileNode {
  file: {
    contents: string | Uint8Array;
  };
}

export function buildTreeUI(files: { title: string; content: string }[]): FileSystemTree {
  const rootMap: FileSystemTree = {};

  for (const file of files) {
    const parts = file.title.split("/");
    let currentLevel: FileSystemTree = rootMap;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        currentLevel[part] = {
          file: { contents: file.content },
        };
      } else {
        if (!currentLevel[part]) {
          currentLevel[part] = { directory: {} };
        }
        currentLevel = (currentLevel[part] as DirectoryNode).directory;
      }
    }
  }

  return rootMap;
}