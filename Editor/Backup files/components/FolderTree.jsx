import React, { useState } from 'react';
import { Group, Tree, ScrollArea, Input } from '@mantine/core';
import { IconChevronDown, IconFilePlus, IconFolderPlus, IconTrash, IconEdit, IconX, IconRefreshDot, IconDownload } from "@tabler/icons-react";
import '@fontsource/ibm-plex-sans/300.css';
import classes from '../Style/Demo.module.css';
import {
    getIconForFile,
    getIconForFolder,
    getIconForOpenFolder,
} from "vscode-icons-js";

function FolderTree({ dataPack, createDirectoryinFileSystem, createFileinFileSystem, deleteDirectoryinFileSystem, deleteFileinFileSystem, readfileContentfromFilSystem }) {
    const [showInput, setShowInput] = useState(false);
    const [activeNode, setActiveNode] = useState(null);
    const [inputFieldValue, setInputFieldValue] = useState("");
    const [inputType, setInputType] = useState(null); // 'folder' or 'file'
    const [path, setPath] = useState("");

    const handleAddFolderClick = () => {
        setInputType('folder');
        setShowInput(true);
    };

    const handleAddFileClick = () => {
        setInputType('file');
        setShowInput(true);
    };

    const handleFileClick = (filePath, name) => {
        readfileContentfromFilSystem(filePath, name);
    };

    return (
        <div style={{ position: 'relative' }}>
            {showInput && (
                <InputField
                    setShowInput={setShowInput}
                    setInputFieldValue={setInputFieldValue}
                    inputFieldValue={inputFieldValue}
                    createDirectoryinFileSystem={createDirectoryinFileSystem}
                    createFileinFileSystem={createFileinFileSystem}
                    activeNode={activeNode}
                    inputType={inputType}
                    setInputType={setInputType}
                    path={path}
                />
            )}
            <Demo
                data={dataPack}
                activeNode={activeNode}
                setActiveNode={setActiveNode}
                createDirectoryinFileSystem={createDirectoryinFileSystem}
                createFileinFileSystem={createFileinFileSystem}
                deleteDirectoryinFileSystem={deleteDirectoryinFileSystem}
                deleteFileinFileSystem={deleteFileinFileSystem}
                handleAddFolderClick={handleAddFolderClick}
                handleAddFileClick={handleAddFileClick}
                setPath={setPath}
                handleFileClick={handleFileClick}
            />
        </div>
    );
}

function FileIcon({ name, isFolder, expanded }) {
    if (!name) {
        return null; // Do not render anything if name is invalid
    }

    const iconPath = isFolder
        ? expanded
            ? getIconForOpenFolder(name) || "default-folder-open.svg" // Fallback for open folders
            : getIconForFolder(name) || "default-folder.svg" // Fallback for folders
        : getIconForFile(name) || "default-file.svg"; // Fallback for files

    return (
        <img
            src={`../../icons/${iconPath}`}
            alt={name}
            className='mr-2'
            style={{ width: 20, height: 20 }}
        />
    );
}

function Leaf({
    node,
    expanded,
    hasChildren,
    elementProps,
    activeNode,
    setActiveNode,
    handleAddFolderClick,
    handleAddFileClick,
    setPath,
    deleteDirectoryinFileSystem,
    deleteFileinFileSystem,
    handleFileClick,
}) {
    const [showButtons, setShowButtons] = useState(false);
    const isActive = activeNode === node.label;

    const handleClick = (event) => {
        if (elementProps.onClick) {
            elementProps.onClick(event);
        }
        setActiveNode(node.label);
        setPath(node.value); // Set the path state
        setShowButtons(false); // Hide buttons on left-click
        if (!hasChildren) {
            handleFileClick(node.value, node.label);
        }
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setShowButtons(true);
        setActiveNode(node.label);
        setPath(node.value); // Set the path state
    };

    const handleDeleteFolder = (e) => {
        e.stopPropagation();
        deleteDirectoryinFileSystem(node.value);
    };

    const handleDeleteFile = (e) => {
        e.stopPropagation();
        deleteFileinFileSystem(node.value);
    };

    return (
        <Group
            gap={1}
            {...elementProps}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            tabIndex={0}
            style={{ outline: "none" }}
        >
            <div className="flex flex-row justify-between w-full">
                <span className="flex items-center flex-row">
                    {hasChildren && (
                        <IconChevronDown
                            size={18}
                            style={{
                                transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                                transition: "transform 0.2s ease",
                            }}
                        />
                    )}
                    <FileIcon
                        name={node.label}
                        isFolder={hasChildren}
                        expanded={expanded}
                    />
                    <span className="text-gray-300 font-thin">{node.label}</span>
                </span>
                {isActive && showButtons && (
                    <div className="flex items-center space-x-1 ">
                        {hasChildren && (
                            <>
                                <button
                                    className="text-gray-400 hover:text-gray-100"
                                    title="Add File"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddFileClick();
                                    }}
                                >
                                    <IconFilePlus size={20} />
                                </button>
                                <button
                                    className="text-gray-400 hover:text-gray-100"
                                    title="Add Folder"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddFolderClick();
                                    }}
                                >
                                    <IconFolderPlus size={20} />
                                </button>
                            </>
                        )}
                        <button
                            className="text-gray-400 hover:text-gray-100"
                            title="Delete"
                            onClick={hasChildren ? handleDeleteFolder : handleDeleteFile}
                        >
                            <IconTrash size={20} />
                        </button>
                        <button
                            className="text-gray-400 hover:text-gray-100"
                            title="Edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Edit:", node.label);
                            }}
                        >
                            <IconEdit size={20} />
                        </button>
                    </div>
                )}
            </div>
        </Group>
    );
}

function Demo({ data, activeNode, setActiveNode, createDirectoryinFileSystem, createFileinFileSystem, deleteDirectoryinFileSystem, deleteFileinFileSystem, handleAddFolderClick, handleAddFileClick, setPath, handleFileClick }) {
    return (
        <div>
            <div className='bg-zinc-950 border-b border-white h-[5.5vh]'>
                <div className='flex items-center justify-end h-full px-4'>
                    <button
                        className="text-gray-400 hover:text-gray-100 ml-2"
                        title="Add File"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddFileClick();
                        }}
                    >
                        <IconFilePlus size={22} />
                    </button>
                    <button
                        className="text-gray-400 hover:text-gray-100 ml-2"
                        title="Add Folder"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddFolderClick();
                        }}
                    >
                        <IconFolderPlus size={22} />
                    </button>
                    <button className='text-gray-400 hover:text-gray-100 ml-2' title="Refresh"><IconRefreshDot size={22} /></button>
                    <button className='text-gray-400 hover:text-gray-100 ml-2' title="Download"><IconDownload size={22} /></button>
                </div>
            </div>
            <ScrollArea className="scrollbar-thin h-screen">
                <Tree
                    classNames={classes}
                    selectOnClick
                    clearSelectionOnOutsideClick
                    data={data}
                    renderNode={(payload) => (
                        <Leaf
                            {...payload}
                            activeNode={activeNode}
                            setActiveNode={setActiveNode}
                            createDirectoryinFileSystem={createDirectoryinFileSystem}
                            createFileinFileSystem={createFileinFileSystem}
                            deleteDirectoryinFileSystem={deleteDirectoryinFileSystem}
                            deleteFileinFileSystem={deleteFileinFileSystem}
                            handleAddFolderClick={handleAddFolderClick}
                            handleAddFileClick={handleAddFileClick}
                            setPath={setPath}
                            handleFileClick={handleFileClick}
                        />
                    )}
                />
            </ScrollArea>
        </div>
    );
}

function InputField({ path, setShowInput, setInputFieldValue, inputFieldValue, createDirectoryinFileSystem, createFileinFileSystem, activeNode, inputType, setInputType }) {
    const [error, setError] = useState(false); // Local error state for validation

    const handleSubmit = () => {
        if (!inputFieldValue.trim()) {
            setError(true);
            return;
        }
        if (inputType === 'folder') {
            if (/\s/.test(inputFieldValue)) {
                setError(true);
                return;
            }
            createDirectoryinFileSystem(path, inputFieldValue.trim());
        } else if (inputType === 'file') {
            createFileinFileSystem(path, inputFieldValue.trim());
        }
        setShowInput(false);
        setInputFieldValue("");
        setError(false);
        setInputType(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputFieldValue(value);

        if (inputType === 'folder' && /\s/.test(value)) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-700 bg-opacity-80 flex items-center justify-center">
            <div className='flex flex-col items-center w-full mx-3'>
                <div onClick={(e) => setShowInput(false)} >
                    <IconX className='opacity-70 cursor-pointer rotate-on-hover' />
                </div>
                <div className='bg-zinc-950 px-4 py-2 w-full rounded-lg '>
                    <Input
                        placeholder='Enter Name'
                        value={inputFieldValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}

export default FolderTree;