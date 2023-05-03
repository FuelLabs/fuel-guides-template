#!/bin/bash

function log() {
    if [[ "$with_logs" == true ]]; then
        echo "log: $1"
    fi
}

function get_lines() {
    local raw_input="$1"
    mapfile -t lines < <( echo "$raw_input" | awk -F'\\\\n' '{for(i=1; i<=NF; i++) print $i}' )
}

function check_item() {
    local docs_found=false
    local example_found=false
    local item_body_line_num=$(("$current_line_num" + 1))
    
    
    
    while [[ $item_body_line_num -lt $total_lines ]] ; do
        local item_body_line="${lines[$item_body_line_num]}"
        
        if [[ "$item_body_line" =~ ^-.* ]]; then
            break
        fi
        
        if [[ "$item_body_line" =~ ^[[:space:]]*docs:[[:space:]]*.* ]]; then
            log "----# ${item_body_line_num} docs: ${item_body_line}"
            docs_found=true
            
            elif [[ "$item_body_line" =~ ^[[:space:]]*example?s?:[[:space:]]*.* ]]; then
            log "----# ${item_body_line_num} example: ${item_body_line}"
            
            example_found=true
        else
            log "----- ${item_body_line_num} item_body: ${item_body_line}"
        fi
        
        item_body_line_num=$(("$item_body_line_num" + 1))
    done
    
    
    if [[ "$docs_found" == false ]]; then
        log "⚠️ Missing docs for $line"
        exit 1
        elif [[ "$example_found" == false ]]; then
        log "⚠️ Missing example for $line"
        exit 1
    fi
    
}


function check_block() {
    local block_name="$1"
    local items_amount=0
    
    local total_lines="${#lines[@]}"
    local current_line_num=0
    
    local block_found=false
    
    log ""
    log "- analyzing: ${block_name}"
    log ""
    
    while [[ $current_line_num -lt $total_lines ]]; do
        
        local line="${lines[$current_line_num]}"
        
        # log "-- ${current_line_num}: ${line}"
        
        if [[ $line == "$block_name" ]]; then
            block_found=true
            log "## $current_line_num found block $block_name"
            log ""
        fi
        
        if [[ $block_found == true && "$line" =~ ^-.* ]]; then
            log "-- ${current_line_num} item: ${line}"
            items_amount=$(("$items_amount" + 1))
            check_item
            log ""
            
        fi
        
        if [[ "$line" == "breaking changes:" &&  "$block_name" != "breaking changes:" ]]; then
            break
        fi
        current_line_num=$(("$current_line_num" + 1))
    done
    
    log ""
    log "total items ${items_amount}"
    log ""
    
    
    if [[ "$block_found" == false ]]; then
        log "⚠️ Block not found: $block_name"
        exit 1
        elif [[ "$block_found" == true && "$items_amount" == 0 ]]; then
        # how to: "if items_amount == 0; set line 'no items for $block_name' "
        log "⚠️ No valid items for $block_name"
        log "  items must be in format: '- [change-title]:'"
        exit 1
    fi
    
    log ""
}

function linter() {
    local raw_input=$1
    local with_logs=true
    
    lines=()
    
    get_lines "$raw_input"
    
    check_block  "new features:"
    check_block  "breaking changes:"
    
    echo "$raw_input"
}

# linter "$input"
linter "$1"


