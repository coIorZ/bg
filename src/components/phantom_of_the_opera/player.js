import React, { Component } from 'react';
import cx from 'classnames';

import Card from './card';
import styles from './player.css';

export default class Player extends Component {
    render() {
        const { player, users, user, data, language } = this.props;
        const { turn, phantom, investigator } = data;
        const phantomLabel = language === 'ch' ? '魅影' : 'Phantom';
        const investigatorLabel = language === 'ch' ? '调查员' : 'Investigator';
        return (
            <div
                className={cx({
                    [styles.container]: true,
                    [styles.active]: (player.phantom && !turn) || (!player.phantom && turn)
                })}
            >
                <div>
                    <span>{users[player.id].name}</span>
                </div>
                {player.phantom ? 
                    <div>
                        <span>{phantomLabel}</span>
                        {user._id === phantom.id ?
                            <div className={styles.phantom}>
                                <Card id={phantom.phantom} display={1} small={true} />
                            </div>
                            : null
                        }
                    </div>
                    : <div>
                        <span>{investigatorLabel}</span>
                    </div> 
                }
                {player.alibis.map(id => <Card id={id === 17 || !player.phantom ? id : -2} small={true} key={id} />)}
            </div>
        );
    }
};