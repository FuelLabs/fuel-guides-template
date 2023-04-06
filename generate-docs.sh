#!/bin/bash

# Check if an input file name and guide folder path were provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: No input file name or guide folder path provided."
  exit 1
fi

# Function to convert a GUIDE.md file to MDX files
function convert_guide_to_mdx() {
echo $PWD
  local input_file="$1"
  local guide_folder="$2"
  local output_dir="$guide_folder/docs"
  local output_constants_dir="$guide_folder/src/generatedConstants"
  local filenames=()
  local headings=()

  # Change directory to the guide folder
  echo "Input file: $input_file"
  echo "Guide folder: $guide_folder"

  # Create the output directory if it doesn't exist
  if [ -d "$output_dir" ]; then
    rm -rf "$output_dir"
  fi
  mkdir -p "$output_dir"

  # Loop through each line in the input file
  while read line; do
    # If the line starts with a heading and not with #[storage, create a new output file
    if [[ $line =~ ^# && ! $line =~ ^#\[(storage|STORAGE) ]]; then
      # Get the raw text of the heading and remove any leading/trailing whitespace
      raw_heading_text=$(echo "$line" | sed -E 's/^[[:space:]]*//;s/[[:space:]]*$//')

      # Get the text of the heading without the '#' characters and remove any leading/trailing whitespace
      heading_text=$(echo "$raw_heading_text" | sed -E 's/^#+\s*//;s/\s*$//')

      # Get the root filename without extension
      root_filename=$(echo "$heading_text" | tr '[:upper:]' '[:lower:]' | sed 's/^ *//;s/ *$//;s/ /-/g')

      # Add the root filename to the filenames list
      filenames+=("$root_filename")
      headings+=("$(echo "$heading_text" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')")

      # Set the output file path
      output_file="$output_dir/$root_filename.mdx"

      # Add a section to the output file
      echo "---" >> "$output_file"
      echo "title: $heading_text" >> "$output_file"
      echo "---" >> "$output_file"
      echo "$raw_heading_text" >> "$output_file"
    else
      # Write the current line to the current output file
      echo "$line" >> "$output_file"
    fi
  done < "$input_file"

  # Create the output directory if it doesn't exist
  if [ -d "$output_constants_dir" ]; then
    rm -rf "$output_constants_dir"
  fi
  mkdir -p "$output_constants_dir"

  # Write the filenames list as a JSON array to a new file
  echo "$(printf '%s\n' "${filenames[@]}" | jq -R . | jq -s .)" > "$output_constants_dir/filenames.json"

  # Write the headings list as a JSON array to a new file
  echo "$(printf '%s\n' "${headings[@]}" | jq -R . | jq -s .)" > "$output_constants_dir/headings.json"

  # Print the list of filenames
  echo "Created filenames.json and headings.json in $output_constants_dir"


}

# Call the function with the input file name
convert_guide_to_mdx $1 $2
