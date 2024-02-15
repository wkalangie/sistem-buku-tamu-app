export default function componentStyleOverrides(theme, borderRadius, outlinedFilled) {
    const bgColor = theme.palette.primary[100];
    const menuSelectedBack = theme.palette.primary[90];
    const menuSelected = theme.palette.secondary.main;

    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: `${borderRadius}px`
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.dark,
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    alignItems: 'center'
                },
                outlined: {
                    border: '1px dashed'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: menuSelected,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: menuSelected,
                        backgroundColor: menuSelectedBack,
                        '&:hover': {
                            backgroundColor: menuSelectedBack,
                            color: menuSelected,
                            '& .MuiListItemText-root': {
                                color: menuSelected
                            }
                        },
                        '& .MuiListItemIcon-root': {
                            color: menuSelected
                        },
                        '& .MuiListItemText-root': {
                            color: menuSelected
                        }
                    },
                    '&:hover': {
                        backgroundColor: menuSelectedBack,
                        color: menuSelected,
                        '& .MuiListItemIcon-root': {
                            color: menuSelected
                        },
                        '& .MuiListItemText-root': {
                            color: menuSelected
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    minWidth: '36px',
                    '&:hover': {
                        color: menuSelected
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    '&:hover': {
                        color: menuSelected
                    }
                },
                primary: {
                    color: theme.palette.text.primary,
                    '&:hover': {
                        color: menuSelected
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.palette.text.dark,
                    '&::placeholder': {
                        color: theme.palette.text.secondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    borderRadius: `${borderRadius}px`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.grey[400]
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.palette.background.default
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    background: 'transparent',
                    padding: '15.5px 14px',
                    borderRadius: `${borderRadius}px`,
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: `${borderRadius}px`
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.palette.grey[300]
                    }
                },
                mark: {
                    backgroundColor: theme.palette.background.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme.palette.background.default
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiAutocomplete-tag': {
                        background: theme.palette.secondary.light,
                        borderRadius: 4,
                        color: theme.palette.text.dark,
                        '.MuiChip-deleteIcon': {
                            color: theme.palette.secondary[200]
                        }
                    }
                },
                popper: {
                    borderRadius: `${borderRadius}px`,
                    boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.palette.divider,
                    opacity: 1
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    color: theme.palette.primary[100],
                    '&:focus': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    /** checked not prop
                     *"&.Mui-checked": {
                     *    fontSize: "28px"
                     *}
                     */
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.palette.primary[100],
                    background: theme.palette.primary[200]
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTimelineContent: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.dark,
                    fontSize: '16px'
                }
            }
        },
        MuiTreeItem: {
            styleOverrides: {
                label: {
                    marginTop: 14,
                    marginBottom: 14
                }
            }
        },
        MuiTimelineDot: {
            styleOverrides: {
                root: {
                    boxShadow: 'none'
                }
            }
        },
        MuiInternalDateTimePickerTabs: {
            styleOverrides: {
                tabs: {
                    backgroundColor: theme.palette.background.default,
                    '& .MuiTabs-flexContainer': {
                        borderColor: theme.palette.primary[40]
                    },
                    '& .MuiTab-root': {
                        color: theme.palette.grey[900]
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.primary[100]
                    },
                    '& .Mui-selected': {
                        color: theme.palette.primary[100]
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    borderBottom: '1px solid',
                    borderColor: theme.palette.grey[200]
                }
            }
        },
        // MuiDialog: {
        //     styleOverrides: {
        //         paper: {
        //             padding: '12px 0 12px 0'
        //         }
        //     }
        // },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: theme.palette.grey[200],
                    '&.MuiTableCell-head': {
                        fontSize: '0.875rem',
                        color: theme.palette.grey[600],
                        fontWeight: 500
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.palette.background.paper,
                    background: theme.palette.text.primary
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '1.25rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.paper,
                    marginBottom: '1rem'
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '1rem'
                }
            }
        }
    };
}
