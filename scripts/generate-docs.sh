#!/bin/bash

# TODO: prettier logs

# Check if an input file name and guide folder path were provided
if [ -z "$1" ]; then
  echo "Error: No input file path provided."
  exit 1
fi

# Function to convert a GUIDE.md file to MDX files
function convert_guide_to_mdx() {
  local input_file="$1"
  local examples_input_dir="$2"
  local docs_dir="./docs"
  local examples_dir="./examples"
  local output_constants_dir="./src/generatedConstants"
  local filenames=()
  local headings=()


  # Create the docs output directory if it doesn't exist
  if [ -d "$docs_dir" ]; then
    rm -rf "$docs_dir"
  fi
  mkdir -p "$docs_dir"

# Create the exmaples output directory if it doesn't exist
  if [ -d "$examples_dir" ]; then
    rm -rf "$examples_dir"
  fi
  mkdir -p "$examples_dir"

  cp -v "$examples_input_dir"/* "$examples_dir"/

  # Loop through each line in the input file
  while read line; do
    # If the line starts with a heading and not with #[storage, create a new output file
    if [[ $line =~ ^# && ! $line =~ ^#\[(storage|STORAGE) ]]; then


      # Just for readability
      raw_heading_text=$line
      echo "raw_heading_text: [$raw_heading_text]"

      # Get the text of the heading without the '#' characters and remove any leading/trailing whitespace
      heading_text=$(echo "$raw_heading_text" | sed -E 's/^#+\s*//; s/^ +//')
      echo "   heading_text: [$heading_text]"

      # Removes non alphabetical, replaces spaces with hyphens, sets all to lowercase
      root_filename=$(echo "$heading_text" | sed -E 's/[^[:alpha:] ]//g; s/[[:space:]]+/-/g' | tr '[:upper:]' '[:lower:]')
      echo "   root_filename: [$root_filename]"


      # Add the root filename to the filenames list
      filenames+=("$root_filename")
      headings+=("$(echo "$heading_text" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')")

      # Set the output file path
      output_file="$docs_dir/$root_filename.mdx"

      # Add a section to the output file
      echo "---" >> "$output_file"
      echo "title: $heading_text" >> "$output_file"
      echo "---" >> "$output_file"
      echo "$raw_heading_text" >> "$output_file"

    elif [[ $line =~ ^\{\{\#include ]]; then
    # Use regex to extract the path from the string
    regex='{{#include (.+) ([[:digit:]]+):([[:digit:]]+)}}'

      if [[ $line =~ $regex ]]; then
        # TODO: solve this path
        example_path="${examples_input_dir}/${BASH_REMATCH[1]}"
        code_import_path=".${examples_dir}/${BASH_REMATCH[1]}"
        start_line="${BASH_REMATCH[2]}"
        end_line="${BASH_REMATCH[3]}"

        echo "   example_path: [$example_path]"
        echo "   code_import_path: [$code_import_path]"

        # TODO: examples folder by input
        echo "<CodeImport file=\"$code_import_path\" lineStart=\"$start_line\" lineEnd=\"$end_line\"  />" >> "$output_file"

        # FIXME: this is written as this file="./examples/package.json"
        # when it should be global import file="@examples/package.json"

        # Use sed to extract the section
        # section=$(sed -n "${start_line},${end_line}p" "${example_path}")

        # Print the extracted section
        # TODO: this goes to summarized readme
        # echo "   ${section}"
        # quotes="\`\`\`"
        # echo "$quotes" >> "$output_file"
        # echo "$section" >> "$output_file"
        # echo "$quotes" >> "$output_file"
        # echo "```" >> "$output_file"
        # echo "$quotes" 
        

      else
        echo "No match found."
      fi
      
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
