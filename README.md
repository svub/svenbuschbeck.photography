This is my photography website hosted at svenbuschbeck.photography.

If you want to reuse the code, go ahead, attribution is not required but appreciated.

# How it works

Put a folder outside this folder named `photos`.
Inside, place one folder for each album.
The alphabetic order will be the order in the website.
Inside each folder

* Place your images as JPG (again, alphabetic order)
* And a `text.json` file with two fields: "title" and "description"

Then run `update-data.sh`.
This will read the `photos` folder and create all the necessary files and structures in `docs`.
