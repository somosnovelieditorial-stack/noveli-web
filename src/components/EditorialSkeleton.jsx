import React from 'react';

export default function EditorialSkeleton({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });
  
  if (type === 'gallery') {
    return (
      <div className="skeleton-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', width: '100%', padding: '10px 0' }}>
        {items.map((_, i) => (
          <div key={i} className="skeleton-pulse" style={{ width: '100%', height: '80px', backgroundColor: '#F2F2F2', borderRadius: '4px' }}></div>
        ))}
      </div>
    );
  }

  if (type === 'books') {
    return (
      <div className="home-books-compact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', justifyContent: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {items.map((_, i) => (
          <div key={i} className="skeleton-pulse" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{ height: '170px', width: '113px', backgroundColor: '#F2F2F2', borderRadius: '4px' }}></div>
            <div style={{ height: '14px', width: '70%', backgroundColor: '#F2F2F2', borderRadius: '2px' }}></div>
            <div style={{ height: '10px', width: '40%', backgroundColor: '#F2F2F2', borderRadius: '2px' }}></div>
            <div style={{ height: '32px', width: '100%', backgroundColor: '#F2F2F2', borderRadius: '2px', marginTop: 'auto' }}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="services-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%' }}>
      {items.map((_, i) => (
        <div key={i} className="skeleton-pulse" style={{ backgroundColor: '#FFFFFF', padding: '24px', height: '260px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #E5E5E5', borderRadius: '4px' }}>
          <div style={{ height: '100px', width: '100%', backgroundColor: '#F2F2F2', borderRadius: '4px' }}></div>
          <div style={{ height: '16px', width: '60%', backgroundColor: '#F2F2F2', borderRadius: '2px' }}></div>
          <div style={{ height: '12px', width: '90%', backgroundColor: '#F2F2F2', borderRadius: '2px' }}></div>
          <div style={{ height: '12px', width: '80%', backgroundColor: '#F2F2F2', borderRadius: '2px' }}></div>
          <div style={{ height: '36px', width: '100%', backgroundColor: '#F2F2F2', borderRadius: '2px', marginTop: 'auto' }}></div>
        </div>
      ))}
    </div>
  );
}
