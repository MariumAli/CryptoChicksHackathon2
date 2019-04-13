const Asset = artifacts.require("./Asset.sol");

contract("Asset", accounts => {
  it("should store the string 'Hey there!'", async () => {
    const asset = await Asset.deployed();

    // Set myString to "Hey there!"
    await asset.set("Hey there!", { from: accounts[0] });

    // Get myString from public variable getter
    const storedString = await asset.myString.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });
});