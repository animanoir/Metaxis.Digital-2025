'use client'

import React from 'react';
import Modal from 'react-modal'
import styles from './newsLetterModal.module.css'


interface NewsletterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Newsletter Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Subscribe to our newsletter</h2>
      <p>Subscribe to our newsletter to get the latest updates</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  )
}

export default NewsletterModal;