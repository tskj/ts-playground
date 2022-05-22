#!/bin/bash

session=ll1-parser

tmux new -s $session -d

tmux send-keys -t $session 'nvim parser.ts' C-m

tmux split-window -h -t $session
tmux resize-pane -t $session -R 1000
tmux send-keys -t $session 'watch -d -n 0.05 deno run fiddle.ts' C-m

tmux select-pane -L -t $session

tmux attach -t $session
