import React, { HTMLAttributes } from 'react';
import { LoadActivity } from './util';
import '/css/Components.scss';

export function Loader({
  activity,
}: { activity: LoadActivity } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="loader">
      <div className="bg" />
      {activity.title} ...
    </div>
  );
}

export function Toggle({
  checked = false,
  value = true,
  onChange,
  style,
  children,
  ...props
}: HTMLAttributes<HTMLInputElement>) {
  return (
    <label style={style} {...props}>
      <div
        onClick={() => onChange(checked ? false : value)}
        style={{
          display: 'inline-block',
          width: '4em',
          backgroundColor: '#ccc',
          borderRadius: '.5em',
          marginRight: '.5em',
        }}
      >
        <div
          style={{
            width: '3em',
            borderRadius: '.5em',
            textAlign: 'center',
            transition: '.15s',
            marginLeft: checked ? '0' : '1em',
            backgroundColor: checked ? '#090' : '#aaa',
            color: '#fff',
          }}
        >
          {checked ? 'On' : 'Off'}
        </div>
      </div>
      {children}
    </label>
  );
}

export function Flash(o, bg = '#f80') {
  const SPACE = 10;

  const graph = document.querySelector('#graph') as HTMLDivElement;
  const prev = document.querySelector('.flash:last-of-type') as HTMLElement;
  const el = document.createElement('div');

  if (o instanceof Error) {
    el.classList.add('error');
    el.innerText = o.message;
  } else if (o instanceof Document) {
    el.append(...o.querySelector('body').children);
  } else if (o instanceof Element || o instanceof DocumentFragment) {
    el.append(o);
  } else if (typeof o == 'string') {
    el.innerText = o;
  } else {
    el.innerText = JSON.stringify(o, null, 2);
  }

  document.body.appendChild(el);
  el.classList.add('flash');
  const prevBottom = prev ? prev.offsetTop + prev.offsetHeight : 0;

  const top =
    prevBottom < window.innerHeight - el.offsetHeight ? prevBottom : 0;
  el.style.top = `${top + SPACE / 2}px`;
  el.style.left = `${-el.offsetWidth - SPACE}px`;
  el.style.maxWidth = graph ? `${graph.offsetWidth - SPACE}px` : '100%';
  el.style.backgroundColor = bg;

  setTimeout(() => {
    el.style.left = `${SPACE}px`;

    setTimeout(() => {
      el.addEventListener('transitionend', () => el.remove());
      el.style.left = `${-el.offsetWidth - SPACE}px`;
    }, 5e3);
  }, 0);
}
