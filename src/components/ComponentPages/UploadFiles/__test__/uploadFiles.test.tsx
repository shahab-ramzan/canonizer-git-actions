import { render, screen } from "../../../../utils/testUtils";
import UploadFileUI from "../UploadFilesUI";
import messages from "../../../../messages";

const { labels } = messages;

const input = "";
const setInput = jest.fn();
const selectedFolderID = jest.fn();
const setFileLists = jest.fn();
const folderFiles = [];
const setFolderFiles = jest.fn();
const uploadFun = jest.fn();
const closeFolder = jest.fn();
const handleCancel = jest.fn();
const handle_X_btn = jest.fn();
const addNewFile = jest.fn();
const Openfolder = jest.fn();
const removeFiles = jest.fn();
const uploadFileList = [];
const setUploadFileList = jest.fn();
const removeUploadFiles = jest.fn();
const GetUploadFileAndFolder = jest.fn();
const getFileListFromFolderID = [];
const setShowCreateFolderModal = jest.fn();
const showCreateFolderModal = true;
const DeleteConfirmationVisible = true;
const setDeleteConfirmationVisible = jest.fn();
const flickringData = true;
const setFlickringData = jest.fn();
const toggleFileView = true;
const setToggleFileView = jest.fn();
// const listview = <ListView/>

const fileLists = [
  {
    created_at: 1650894718,
    deleted_at: null,
    file_id: "can-lmLrBLqFe",
    file_name: "Third.jpg",
    file_path:
      "https://canonizer-public-file.s3.us-east-2.amazonaws.com/TWFsaWExMTM0TWFsaWE%3D_1650894717_713566.jpg",
    short_code_path:
      "https://canonizer-public-file.s3.us-east-2.amazonaws.com/TWFsaWExMTM0TWFsaWE%3D_1650894717_713566.jpg",
    file_type: "image/jpeg",
    folder_id: null,
    id: 132,
    short_code: "can-lmLrBLqFe",
    type: "file",
    updated_at: 1650894718,
    user_id: 1134,
  },
  {
    created_at: 1651209637,
    deleted_at: null,
    id: 109,
    name: "can",
    type: "folder",
    updated_at: 1651209637,
    uploads_count: 0,
    user_id: 1134,
  },
];
describe("Upload File Page", () => {
  it("render Upload Files Page ", () => {
    render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    expect(screen.getByText(labels.uploadFiles)).toBeTruthy();
    expect(screen.getByText(labels.maxSize)).toBeTruthy();
    expect(screen.getByPlaceholderText("Select date")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();
    expect(
      screen.getAllByText("Create a Folder")[0] as HTMLButtonElement
    ).toBeInTheDocument();
  });
  it("render upload file(images) is loaded ", () => {
    render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    expect(screen.getByText(labels.uploadFiles)).toBeTruthy();
    expect(screen.getByText(labels.maxSize)).toBeTruthy();
    expect(screen.getByPlaceholderText("Select date")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();
    expect(
      screen.getAllByText("Create a Folder")[0] as HTMLButtonElement
    ).toBeInTheDocument();
  });
  it("render Create folder button", () => {
    const { getAllByText } = render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    const createFolderbutton = getAllByText(
      "Create a Folder"
    )[0] as HTMLButtonElement;
    expect(createFolderbutton).toBeTruthy();
  });

  it("render Create folder button", async () => {
    const { getByAltText } = await render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    const image = getByAltText("gridView");

    expect(image).toHaveAttribute("alt", "gridView");
  });

  it("render Create folder button", async () => {
    const { getByAltText } = await render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    const image = getByAltText("listView");

    expect(image).toHaveAttribute("alt", "listView");
  });

  it("render heading in the list view", () => {
    render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    expect(screen.getByText("File Name")).toBeTruthy();
    expect(screen.getByText("Perma Link")).toBeTruthy();
    expect(screen.getByText("Created Date")).toBeTruthy();
    expect(screen.getByText("Action")).toBeTruthy();
  });

  it("render list view threeDot icon", () => {
    const { container } = render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    expect(container.getElementsByClassName("threeDOt")).toBeTruthy;
    expect(container.getElementsByClassName("UploadFile_shortcode_icon__Ixf_x"))
      .toBeTruthy;
  });

  it("render list view & grid view icon icon", () => {
    const { container } = render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    expect(container.getElementsByClassName("top_icon")).toBeTruthy;
  });

  it("render menuList  icon", () => {
    const { container } = render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );
    expect(container.getElementsByClassName("menu_item")).toBeTruthy;
  });

  it("render Modal when create folder button  is clicked", () => {
    const { getByText } = render(
      <UploadFileUI
        input={input}
        setInput={setInput}
        selectedFolderID={selectedFolderID}
        fileLists={fileLists}
        setFileLists={setFileLists}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        closeFolder={closeFolder}
        uploadFun={uploadFun}
        handleCancel={handleCancel}
        handle_X_btn={handle_X_btn}
        addNewFile={addNewFile}
        Openfolder={Openfolder}
        removeFiles={removeFiles}
        uploadFileList={uploadFileList}
        setUploadFileList={setUploadFileList}
        removeUploadFiles={removeUploadFiles}
        GetUploadFileAndFolder={GetUploadFileAndFolder}
        getFileListFromFolderID={getFileListFromFolderID}
        setShowCreateFolderModal={setShowCreateFolderModal}
        showCreateFolderModal={showCreateFolderModal}
        DeleteConfirmationVisible={DeleteConfirmationVisible}
        setDeleteConfirmationVisible={setDeleteConfirmationVisible}
        flickringData={flickringData}
        setFlickringData={setFlickringData}
        toggleFileView={toggleFileView}
        setToggleFileView={setToggleFileView}
      />
    );

    const addbutton = getByText("Create");
    expect(addbutton).toBeTruthy();
    expect(
      screen.getAllByText(labels.CreateaFolder)[0] as HTMLLabelElement
    ).toBeInTheDocument();
    expect(screen.getByText(labels.FolderName)).toBeInTheDocument();
  });
});
